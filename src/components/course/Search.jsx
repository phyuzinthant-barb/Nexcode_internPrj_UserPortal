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
    <div className="search-input" >
    <Search placeholder="input search courses" onSearch={onSearch} enterButton allowClear/>
    </div>
  );
};

export default SearchCourses;
