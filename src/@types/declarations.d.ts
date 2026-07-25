declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

// Plain stylesheets are only ever imported for their side effects.
declare module '*.scss';
