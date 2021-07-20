function Stat(props: { stat: string; val: number }) {
  return (
    <span>
      {props.stat} ({props.val})
    </span>
  );
}

export default Stat;
