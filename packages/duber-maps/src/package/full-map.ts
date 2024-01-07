import styled from 'styled-components'
import { Box } from '../components/Layout'
import { MapSettings } from '../utils/constants'
import { BoxShadow } from '../utils/Theme'

export { default as OutsideClickHandler } from 'react-outside-click-handler'

export {
  Circle,
  DrawingManager,
  GoogleMap,
  type GoogleMapProps,
  InfoWindow,
  Polygon,
  Polyline,
} from "@react-google-maps/api";

export * as R from 'ramda'

export { default as styled } from 'styled-components'

export { BoxShadow } from '../utils/Theme'

export { Box } from '../components/Layout'

export { MapSettings } from '../utils/constants'

export * as MT from '../types/mapTypes'

export {
  BorderWidth,
  ButtonColor,
  NamesToColors,
  PolygonCard,
} from "../components/PolygonCard";

export { UndoButton } from "../components/UndoButton";

export {
  calculatePolygonArea,
  coordinateFuncsToCoordinates,
  dropAndReturnElementById,
  dropAndReturnLastElement,
  getPolygonOptionByName,
  processOnVertexOrEdgeClick,
} from "../utils";

const {
  InfoWindowOptions,
} = MapSettings;

export const MapStyles = styled(Box)`
  /* Remove default infoWindow close button */
  .gm-ui-hover-effect {
    display: none !important;
  }
  /* set infoWindow triangle styles */
  .gm-style .gm-style-iw-tc {
    display: none;
  }
  .gm-style .gm-style-iw-tc::after {
    width: ${InfoWindowOptions.Triangle.width}px;
    height: ${InfoWindowOptions.Triangle.height}px;
    transform: translateX(50%);
  }
  /* set infoWindow container styles */
  .gm-style-iw.gm-style-iw-c {
    box-shadow: ${BoxShadow.Small};
    padding: 0;

    .gm-style-iw-d {
      overflow: hidden !important;
    }
  }
`;