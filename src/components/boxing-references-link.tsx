import { Link } from '@material-ui/core';

function BoxingReferencesLink(props: { children: string; url?: string }) {
  return <Link href={'/boxing-references/' + props.url}>{props.children}</Link>;
}

export default BoxingReferencesLink;
