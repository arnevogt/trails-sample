// SPDX-FileCopyrightText: 2023 Open Pioneer project (https://github.com/open-pioneer)
// SPDX-License-Identifier: Apache-2.0
import { Box, Button, Flex } from "@open-pioneer/chakra-integration";
import { Layer, MapAnchor, MapContainer, SimpleLayer, useMapModel } from "@open-pioneer/map";
import { useIntl } from "open-pioneer:react-hooks";
import { SectionHeading, TitledSection } from "@open-pioneer/react-utils";
import { Toc } from "@open-pioneer/toc";
import { Notifier } from "@open-pioneer/notifier";
import { MAP_ID } from "./services/MapProvider";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromExtent } from "ol/geom/Polygon";
import Feature from "ol/Feature";
import { useState } from "react";
import TileLayer from "ol/layer/Tile";
import { StadiaMaps } from "ol/source";

export function MapApp() {
    const intl = useIntl();
    //hook to access the map model in a component
    const mapState = useMapModel(MAP_ID);
    const [layerCount, setLayerCount] = useState(0);

    function addLayer() {
        const mapModel = mapState.map;
        if (mapModel) {
            //ensure that map is ready
            //this is an raw OL layer instance
            //all layer types from the OL API are supported
            const olLayer = new VectorLayer({
                source: new VectorSource({
                    features: [
                        new Feature(
                            fromExtent([-1000000, 5000000, 3000000, 7000000]) // minX, minY, maxX, maxY
                        )
                    ]
                })
            });

            //this is the OP Trails wrapper which takes an instance of an OL layer
            const newLayer = new SimpleLayer({
                visible: true,
                isBaseLayer: false,
                olLayer: olLayer, //this can be any kind of ol layer
                title: "new vector layer " + layerCount
            });

            mapModel.layers.addLayer(newLayer);

            setLayerCount(() => layerCount + 1);
        }
    }

    function changeLayerSource() {
        //this is an alternative approach instead of dynamically adding/removing layers
        //instead of creating a new layer it changes the source of the underlying OL layer
        const mapModel = mapState.map;
        if (mapModel) {
            //ensure that map is ready
            const baseLayer = mapModel.layers.getLayerById("base")! as Layer; //we know it is safe but should checked properly in a "real" app
            const olLayer = baseLayer.olLayer as TileLayer; //access the underlying ol layer
            //set new source
            olLayer.setSource(
                new StadiaMaps({
                    layer: "stamen_watercolor"
                    // apiKey: 'OPTIONAL'
                })
            );
        }
    }

    return (
        <Flex height="100%" direction="column" overflow="hidden">
            <Notifier position="bottom" />
            <TitledSection
                title={
                    <Box
                        role="region"
                        aria-label={intl.formatMessage({ id: "ariaLabel.header" })}
                        textAlign="center"
                        py={1}
                    >
                        <SectionHeading size={"md"}>
                            Open Pioneer Trails - Map Sample
                        </SectionHeading>
                    </Box>
                }
            >
                <Flex flex="1" direction="column" position="relative">
                    <MapContainer
                        mapId={MAP_ID}
                        role="main"
                        aria-label={intl.formatMessage({ id: "ariaLabel.map" })}
                    >
                        <MapAnchor position="top-right" horizontalGap={5} verticalGap={5}>
                            <Box
                                backgroundColor="white"
                                borderWidth="1px"
                                borderRadius="lg"
                                padding={2}
                                boxShadow="lg"
                                role="top-right"
                                aria-label={intl.formatMessage({ id: "ariaLabel.topRight" })}
                            >
                                <Toc
                                    showTools={true}
                                    basemapSwitcherProps={{
                                        allowSelectingEmptyBasemap: true
                                    }}
                                    mapId={MAP_ID}
                                />
                            </Box>
                        </MapAnchor>
                        <MapAnchor position="bottom-right" horizontalGap={10} verticalGap={30}>
                            <Flex
                                role="bottom-right"
                                aria-label={intl.formatMessage({ id: "ariaLabel.bottomRight" })}
                                direction="column"
                                gap={1}
                                padding={1}
                            >
                                <Button isActive={true} onClick={addLayer}>
                                    add layer
                                </Button>
                                <Button isActive={true} onClick={changeLayerSource}>
                                    change layer source
                                </Button>
                            </Flex>
                        </MapAnchor>
                    </MapContainer>
                </Flex>
            </TitledSection>
        </Flex>
    );
}
