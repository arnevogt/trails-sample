// SPDX-FileCopyrightText: 2023 Open Pioneer project (https://github.com/open-pioneer)
// SPDX-License-Identifier: Apache-2.0
import { Box, Flex, Button } from "@open-pioneer/chakra-integration";
import { MapContainer, useMapModel } from "@open-pioneer/map";
import { SectionHeading, TitledSection } from "@open-pioneer/react-utils";
import { Notifier } from "@open-pioneer/notifier";
import { MAP_ID } from "./services";
import { HelloWorld } from "./HelloWorldComponent";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";

export function MapApp() {
    const mapState = useMapModel(MAP_ID);

    function zoom() {
        const mapModel = mapState.map;
        if (mapModel) {
            //check if map is ready
            mapModel.olView.fit(new Point(fromLonLat([7.61358, 51.9638025])), { maxZoom: 15 });
        }
    }

    return (
        <Flex height="100%" direction="column" overflow="hidden">
            <Notifier position="bottom" />
            <TitledSection
                title={
                    <Box role="region" textAlign="center" py={1}>
                        <SectionHeading size={"md"}>
                            Open Pioneer Trails - JS Map Sample
                        </SectionHeading>
                    </Box>
                }
            >
                <Flex flex="1" direction="column" position="relative">
                    <MapContainer mapId={MAP_ID} role="main"></MapContainer>
                    <HelloWorld></HelloWorld>
                    <Button onClick={zoom}>Zoom to Münster</Button>
                </Flex>
            </TitledSection>
        </Flex>
    );
}
