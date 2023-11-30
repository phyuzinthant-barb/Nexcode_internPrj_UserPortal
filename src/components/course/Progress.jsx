import { Progress } from 'antd';

const CustomProgress = ({ percent }) => {
  // const strokeColor = percent === 100 ? '#52c41a' : undefined;

  return <Progress percent={percent} status="active" />;
  // strokeColor={strokeColor} 
};

export default CustomProgress;
