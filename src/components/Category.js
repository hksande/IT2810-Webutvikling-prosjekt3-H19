import React from "react";
import "./../index.css";
import { connect } from "react-redux";
import { setTypeFilter } from "./../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    setTypeFilter: typeFilter => {
      dispatch(setTypeFilter({ typeFilter }));
    }
  };
}

function mapStateToProps(state) {
  return {
    typeFilter: state.filter.typeFilter
  };
}

const CATEGORIES = [null, "Rødvin", "Hvitvin", "Musserende", "Øl", "Sprit"];

function Category(props) {
  const handleCategoryClick = e => {
    props.setTypeFilter(e.currentTarget.dataset.div_name);
  };

  return (
    <div>
      <h3 style={{ color: "#C09F80" }}>Velg kategori:</h3>
      <br />
      <ul className="categoryList">
        {CATEGORIES.map((el, index) => {
          return (
            <li
              key={index}
              className={
                el === props.typeFilter ? "active list-item" : "list-item"
              }
              data-div_name={el}
              onClick={handleCategoryClick}
            >
              {el === null ? "Alle produkter" : el}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
