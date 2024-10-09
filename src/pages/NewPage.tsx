import { useModel } from 'umi';

export default () => {
  // const message = useModel('demo');
  // return <div>{message}</div>;

  const { add, minus } = useModel('counter', (ret) => ({
    add: ret.increment,
    minus: ret.decrement,
  }));

  return (
    <div>
      <button onClick={add}>add by 1</button>
      <p>{add}</p>
      <button onClick={minus}>minus by 1</button>
    </div>
  );
};
