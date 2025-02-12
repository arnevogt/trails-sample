// SPDX-FileCopyrightText: 2023 Open Pioneer project (https://github.com/open-pioneer)
// SPDX-License-Identifier: Apache-2.0
import { Box, Flex } from "@open-pioneer/chakra-integration";
import { MapContainer } from "@open-pioneer/map";
import { SectionHeading, TitledSection } from "@open-pioneer/react-utils";
import { Notifier } from "@open-pioneer/notifier";
import { MAP_ID } from "./services";

export function MapApp() {
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
                </Flex>
            </TitledSection>
        </Flex>
    );
}
