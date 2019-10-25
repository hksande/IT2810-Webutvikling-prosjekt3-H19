import world from "@south-paw/react-vector-maps/maps/json/world.json";
import VectorMap from "@south-paw/react-vector-maps";
import React, { Component } from "react";
import styled from "styled-components";
import "./../index.css";
import { Wrapper, Output, MapWrapper } from "./styled";

const countryMap = {
  Italy: "it",
  England: "gb",
  Frankrike: "fr",
  Hellas: "gr",
  ["New Zealand"]: "nz",
  Australia: "au",
  Spania: "es",
  ["Sør-Afrika"]: "za",
  Sverige: "se",
  Portugal: "pt",
  USA: "us",
  Argentina: "ar",
  Chile: "cl",
  Norge: "no",
  Tyskland: "de",
  Belgia: "be",
  Polen: "pl",
  Østerrike: "at",
  Danmark: "dk",
  Kina: "cn",
  Japan: "jp",
  Island: "is",
  Russland: "ru",
  Libanon: "lb",
  Tsjekkia: "cz",
  Skottland: "gb"
};

const StyledMap = styled(MapWrapper)`
  svg {
    path {
      fill: #565656;

      &[aria-current="true"] {
        fill: #c09f80;
      }
    }
  }
`;

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: null
    };
  }

  setCurrent = id => this.setState({ current: [id] });

  clearCurrent = () => this.setState({ current: null });

  render() {
    const { current } = this.state;
    const top = this.props.data;
    return (
      <div>
        <h1 className="top-products-header">Mest populære produkter</h1>
        <br />
        <Wrapper>
          <Output>
            <h4>
              Hold musen over varenavnet for å se hvilket land det er produsert
              i:
            </h4>
            <ol className="map-list">
              {top.map(el => {
                return (
                  <li
                    className="top-list-item"
                    onMouseEnter={() => this.setCurrent(countryMap[el.origin])}
                    onMouseLeave={() => this.clearCurrent()}
                    key={el.name}
                  >
                    <code>{el.name}</code>
                  </li>
                );
              })}
            </ol>
          </Output>
          <StyledMap>
            <VectorMap {...world} currentLayers={current} />
          </StyledMap>
        </Wrapper>
      </div>
    );
  }
}

/*
Får feilmelding, TODO: fix
Map.propTypes = {
  map: PropTypes.shape({
    id: PropTypes.string.isRequired,
    viewBox: PropTypes.string.isRequired,
    layers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        d: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

*/
