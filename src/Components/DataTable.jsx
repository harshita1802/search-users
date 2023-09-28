import React, { useState, useEffect } from 'react';

function DataTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}&type:user&sort=followers&order=desc&per_page=15`,{
          headers: {
            'Authorization': 'token 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',
        }
        }
      );
      const result = await response.json();
      setData(result.items); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredData = () => {
    if (searchTerm.length > 0 && data) {
      return data.filter((item) =>
        item.login.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  };

  useEffect(() => {
    const fetchAndSetData = async () => {
      if (searchTerm.length > 0) {
        await fetchData();
      } else {
        // data set to an empty array when searchTerm is empty
        setData([]);
      }
    };

    fetchAndSetData(); 
  }, [searchTerm]);

  return (
    <div>
      <input id="search-bar"
        type="text"
        placeholder="Search..."
        spellCheck={false}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm.length > 0 && filteredData().length > 0 ? (
        <table id="table">
          <thead>
            <tr>
              <th>matching user names</th>
            </tr>
          </thead>
          <tbody>
            {filteredData().map((item) => (
              <tr key={item.id}>
                <td>{item.login}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {searchTerm.length > 0 && filteredData().length == 0 ? 
        (<p id="message">User not found!</p>) : null
      }
    </div>
  );
}

export default DataTable;