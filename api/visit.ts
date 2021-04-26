import { VercelRequest, VercelResponse } from '@vercel/node';
import aws from 'aws-sdk';
import { GetItemInput, PutItemInput } from 'aws-sdk/clients/dynamodb';
import { SUBSITE_URL } from '../config/util/subsite';

aws.config.update({
  accessKeyId: process.env.AWS_ACC_KEY,
  secretAccessKey: process.env.AWS_SEC_ACC_KEY,
  region: process.env.AWS_REG,
});

const ddb = new aws.DynamoDB({ apiVersion: '2012-08-10' });

type DDBRecord = {
  url: string;
  month: string;
  count: number;
};

const getViewCount = async (url: string): Promise<DDBRecord> => {
  const month = new Date().toISOString().slice(0, 7);

  if (!process.env.DDB_TABLE_NAME) {
    return { url, month, count: 0 };
  }

  const params: GetItemInput = {
    TableName: process.env.DDB_TABLE_NAME,
    Key: {
      url: { S: url },
      month: { S: month },
    },
  };

  const resp = await ddb.getItem(params).promise();

  if (resp.Item && resp.Item.count && resp.Item.count.N) {
    return { url, month, count: parseInt(resp.Item.count.N) };
  }
  return { url, month, count: 0 };
};

const updateViewCount = async (ddbRecord: DDBRecord) => {
  if (!process.env.DDB_TABLE_NAME) {
    return;
  }

  const params: PutItemInput = {
    TableName: process.env.DDB_TABLE_NAME,
    Item: {
      url: { S: ddbRecord.url },
      month: { S: ddbRecord.month },
      count: { N: ddbRecord.count.toString() },
    },
  };

  await ddb.putItem(params).promise();
};

const getUrlString = (request: VercelRequest): string | null => {
  const referer = request.headers.referer;
  let url;

  if (!referer) {
    console.error('Missing referer');
    return null;
  }

  try {
    url = new URL(referer);
  } catch {
    console.error('Failed to parse referer', referer);
    return null;
  }

  if (url.origin !== SUBSITE_URL) {
    console.error('Referer incorrect');
    return null;
  }

  return `${url.origin}${url.pathname}`;
};

export default async (request: VercelRequest, response: VercelResponse) => {
  const urlString = getUrlString(request);
  if (!urlString) {
    return response.status(400).send('');
  }

  const ddbRecord = await getViewCount(urlString);
  await updateViewCount({
    ...ddbRecord,
    count: ddbRecord.count + 1,
  });

  response.status(204).send('');
};
