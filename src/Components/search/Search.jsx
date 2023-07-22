/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

function Search({ onSearchChange }) {
  const [search, setsearch] = useState(null);

  const loadOptions = async (inputValue) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    );

    const result = await response.json();

    return {
      options: result.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      })),
    };
  };

  const handleOnChange = (searchdata) => {
    setsearch(searchdata);
    onSearchChange(searchdata);
  };

  return (
    <>
      <AsyncPaginate
        placeholder={"Search for city"}
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </>
  );
}

export default Search;
