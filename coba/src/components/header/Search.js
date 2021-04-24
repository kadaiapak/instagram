import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "./UserCard";

const Search = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const { auth } = useSelector((state) => state);

  const closeHandle = () => {
    setSearch("");
    setUser([]);
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoading(true);
      const res = await getDataAPI(`/search?username=${search}`, auth.token);
      setUser(res.data.user);
      setLoading(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
  return (
    <form className="search_form" onSubmit={searchHandler}>
      <input
        autoComplete="off"
        type="text"
        id="search"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase().trim(" "))}
      />
      <div className="search_icon" style={{ opacity: `${search ? 0 : 0.3}` }}>
        <span className="material-icons">search</span>
        <span>Search</span>
      </div>

      <div
        className="close_search"
        style={{ opacity: `${user.length === 0 ? 0 : 1}` }}
        onClick={closeHandle}
      >
        <span>&times;</span>
      </div>

      <div className="loading">
        {loading && <img src="/images/loading.gif" alt="loading"></img>}
      </div>

      <div className="users">
        {search &&
          user &&
          user.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              border="border"
              closeHandle={closeHandle}
            />
          ))}
      </div>

      <button type="submit" style={{ display: "none" }}>
        Submit
      </button>
    </form>
  );
};

export default Search;
