import { Input } from "antd";
import { useState } from "react";

const { Search } = Input;

const SearchCourses = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value, _e, info) => {
    console.log(info?.source, value);
    setSearchValue(value);
    onSearch(value);
  };
  return (
    <Search placeholder="input search courses" onSearch={onSearch} enterButton allowClear style={{minWidth:"200px"}}/>
  );
};

export default SearchCourses;
