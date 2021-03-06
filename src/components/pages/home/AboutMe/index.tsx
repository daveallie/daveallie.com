import React from 'react';
import HR from '~/components/HR';
import Github from '~/components/Icon/Github';
import LinkedIn from '~/components/Icon/LinkedIn';
import Link from '~/components/Link';
import Text from '~/components/Text';
import * as styles from './styles.module.scss';

export default function AboutMe() {
  return (
    <Text
      container="div"
      className={styles.container}
      color="dark"
      weight={300}
      size="1.2rem"
    >
      <Text size="5rem" container="div">
        Hi There!
      </Text>
      <Text size="3rem" container="div">
        My name is <Text weight={500}>Dave</Text>, and I'm a{' '}
        <Text weight={500}>Daveloper</Text>.
      </Text>
      <Text className={styles.details} size="1.5rem">
        I'm currently working at <Text weight={400}>Visibuild</Text> as{' '}
        <Text weight={400}>Chief Technology Officer</Text>.
      </Text>
      <Text className={styles.details} size="1.2rem">
        I was previously working
        <br />
        at <Text weight={400}>Amazon</Text> as a{' '}
        <Text weight={400}>Software Development Engineer</Text>,
        <br />
        at <Text weight={400}>Tanda</Text> as a{' '}
        <Text weight={400}>Software Development Engineer</Text> and{' '}
        <Text weight={400}>CTO</Text>.
      </Text>
      <HR />
      <Text container="div">
        Check out what I'm up to on{' '}
        <Link href="https://github.com/daveallie">
          Github <Github />
        </Link>
      </Text>
      <Text container="div">
        Have a peek at what I'm thinking about on my{' '}
        <Link href="https://blog.daveallie.com">blog</Link>
      </Text>

      <Text className={styles.aboutBlockSpacing} container="div">
        Want to get in contact?
      </Text>
      <Text container="div">
        Connect with me on{' '}
        <Link href="https://www.linkedin.com/in/daveallie">
          LinkedIn <LinkedIn />
        </Link>
      </Text>
      <Text container="div">
        Email me at{' '}
        <Link href="mailto:dave@daveallie.com">dave@daveallie.com</Link>
      </Text>
    </Text>
  );
}
