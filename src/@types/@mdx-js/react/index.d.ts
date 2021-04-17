declare module '@mdx-js/react' {
  type MDXProps = {
    children: React.ReactNode;
    components: { [key: string]: React.ReactNode };
  };
  export class MDXProvider extends React.Component<MDXProps> {}
}
