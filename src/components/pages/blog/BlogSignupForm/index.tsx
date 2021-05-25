import React, { useCallback, useState } from 'react';
import jsonp from 'jsonp';
import Button from '~/components/Button';
import HR from '~/components/HR';
import Input from '~/components/Input';
import Text from '~/components/Text';
import * as styles from './styles.module.scss';

enum FormState {
  Unsubmitted,
  Submitted,
  Submitting,
  Error,
}

export default function BlogSignupForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>(FormState.Unsubmitted);

  const onSubmit = useCallback(() => {
    setFormState(FormState.Submitting);
    setMessage('');

    const url = new URL(
      'https://daveallie.us6.list-manage.com/subscribe/post-json?u=2263c04aa246dc5e732296240&amp;id=4073ae534a&'
    );
    url.searchParams.set('EMAIL', email);
    url.searchParams.set('b_2263c04aa246dc5e732296240_4073ae534a', '');

    new Promise<{ result: string; msg: string }>((resolve, reject) =>
      jsonp(
        url.toString(),
        {
          param: 'c',
        },
        (err, data) => {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        }
      )
    )
      .then((data) => {
        if (data.result !== 'success') {
          setFormState(FormState.Error);
          setMessage(data.msg.replace(/^0 - /, ''));
        } else {
          setFormState(FormState.Submitted);
          setMessage(data.msg);
        }
      })
      .catch(() => {
        setFormState(FormState.Error);
        setMessage('Unexpected error: Please try again');
      });
  }, [setFormState, setMessage, email]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Text color="headingLight">
          <Text container="div" size="2rem" weight={600} align="center">
            Want to see more like this?
          </Text>

          <Text container="div" className={styles.details} size="1.1rem">
            I post infrequently, but if you'd like an email each time I publish
            a post, enter your email below. Unsubscribe anytime.
          </Text>

          <HR width="wide" spaceAfter="half" spaceBefore="half" />

          {message && (
            <Text size="0.9rem" weight={300}>
              <div className={styles.errorContainer}>
                <span className="material-icons" style={{ fontSize: '1rem' }}>
                  priority_high
                </span>
                <span dangerouslySetInnerHTML={{ __html: message }} />
              </div>
            </Text>
          )}

          <div className={styles.inputGroup}>
            <Input
              id="blog-signup-form-email"
              type="email"
              label="Email"
              value={email}
              onChange={setEmail}
              onEnter={onSubmit}
              disabled={formState === FormState.Submitting}
            />
          </div>
        </Text>
        <Button
          onClick={onSubmit}
          disabled={formState === FormState.Submitting}
        >
          <Text weight={500} size="1.2rem">
            Subscribe
          </Text>
        </Button>
      </div>
    </div>
  );
}
