import world from "@south-paw/react-vector-maps/maps/json/world.json";
import VectorMap from "@south-paw/react-vector-maps";
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import "./../index.css";

import { Wrapper, Output, MapWrapper } from "./styled";

const StyledMap = styled(MapWrapper)`
  svg {
    path {
      fill: #3d0043;

      &[aria-current="true"] {
        fill: #d52484;
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

    return (
      <div>
        <h2>Topp 10 mest kjøpte varer</h2>
        <br />
        <Wrapper>
          <Output>
            <p>
              <strong>
                Hold musen over navnene for å se hvilket land varene er fra:
              </strong>
            </p>
            <ul className="map-list">
              <li
                onMouseEnter={() => this.setCurrent("it")}
                onMouseLeave={() => this.clearCurrent()}
              >
                <code>Monchiero Carbone Regret Langhe Nebbiolo</code>
              </li>
              <li
                onMouseEnter={() => this.setCurrent("gb")}
                onMouseLeave={() => this.clearCurrent()}
              >
                <code>Adams New England IPA</code>
              </li>
              <li
                onMouseEnter={() => this.setCurrent("fr")}
                onMouseLeave={() => this.clearCurrent()}
              >
                <code>Ch. Fougas Forces de Vies Premium 2014</code>
              </li>
            </ul>
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
