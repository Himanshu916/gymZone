import { useContext } from "react";
import { FilterContext } from "../contexts/filter-context";
export default function PriceFilter() {
  const { dispatche } = useContext(FilterContext);
  return (
    <>
      <fieldset>
        <legend>Sort By</legend>
        <label htmlFor="sort_low_to_high">
          <input
            onChange={() =>
              dispatche({ type: "sort", payload: "Price_Low_To_High" })
            }
            type="radio"
            id="sort_low_to_high"
            name="sort"
          />
          Price Low To High
        </label>
        <label htmlFor="sort">
          <input
            onChange={() =>
              dispatche({ type: "sort", payload: "Price_High_To_Low" })
            }
            type="radio"
            id="sort"
            name="sort"
          />
          Price High To Low
        </label>
      </fieldset>
    </>
  );
}
