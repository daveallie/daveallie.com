declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

// Plain stylesheets are only ever imported for their side effects. The .css
// case covers third-party stylesheets shipped in packages, e.g. KaTeX's.
declare module '*.scss';
declare module '*.css';
