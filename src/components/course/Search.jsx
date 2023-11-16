import { Input } from "antd";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const App = () => {
  return (
    <Search placeholder="input search text" onSearch={onSearch} enterButton />
  );
};

export default App;
