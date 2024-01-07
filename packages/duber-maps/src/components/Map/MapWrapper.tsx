'use client';

import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, Theme } from "../../utils/Theme";
import "sanitize.css";
import { LoadScript, Libraries } from "@react-google-maps/api";

const LIBRARIES: Libraries = ["drawing", "geometry"];

interface MapWrapperProps {
  children: React.ReactNode,
  loadingElement?: React.ReactNode
}

function MapWrapper({ children, loadingElement }: MapWrapperProps) {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />

      <LoadScript
        googleMapsApiKey={"AIzaSyBkjmJZuDnGRocwQ4aJIz8VYnmuDmQ3IPs"}
        libraries={LIBRARIES}
        loadingElement={loadingElement}
      >
        {children}
      </LoadScript>
    </ThemeProvider>
  );
}

export default MapWrapper;
