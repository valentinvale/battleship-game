import React, { useEffect } from "react";

import styled from "styled-components/native";

import { Text } from "react-native";

import { Picker } from "@react-native-picker/picker";

const ShipPosition = styled.View<{length: number}>`
    width: 100%;
    padding: 20px;
`;

const ShipDropdown = styled(Picker)`
    width: 80%;
    padding: 20px;
`;


const ShipMapInput: React.FC<{shipId: number, length: number, onConfigChange: any}> = ({shipId, length, onConfigChange}) => {

    const [positionX, setPositionX] = React.useState<string>("A");
    const [positionY, setPositionY] = React.useState<number>(1);
    const [direction, setDirection] = React.useState<string>("VERTICAL");

    const sendConfig = () => {
        const config = {
            shipId,
            positionX,
            positionY,
            length,
            direction
        }
        onConfigChange(config);
    }

    // useEffect(() => {
    //     const config = {
    //       shipId,
    //       positionX,
    //       positionY,
    //       length,
    //       direction,
    //     };
    //     onConfigChange(config);
    //   }, [shipId, positionX, positionY, length, direction, onConfigChange]);

    useEffect(() => {
        sendConfig();
    }, [positionX, positionY, direction]);

    async function handleXchange(itemValue: any) {
        setPositionX(itemValue);
    }

    async function handleYchange(itemValue: any) {
        setPositionY(itemValue);
    }

    async function handleDirectionChange(itemValue: any) {
        setDirection(itemValue);
    }

    return (
        <ShipPosition length={length}>
            <Text>Size: {length}</Text>
            <ShipDropdown selectedValue={positionX} onValueChange={(itemValue: any) => {
                setPositionX(itemValue);
            }
            }>
                <Picker.Item label="A" value="A" />
                <Picker.Item label="B" value="B" />
                <Picker.Item label="C" value="C" />
                <Picker.Item label="D" value="D" />
                <Picker.Item label="E" value="E" />
                <Picker.Item label="F" value="F" />
                <Picker.Item label="G" value="G" />
                <Picker.Item label="H" value="H" />
                <Picker.Item label="I" value="I" />
                <Picker.Item label="J" value="J" />
            </ShipDropdown>
            <ShipDropdown selectedValue={positionY} onValueChange={(itemValue: any) => {
                setPositionY(itemValue);
            }
            }>
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="6" value={6} />
                <Picker.Item label="7" value={7} />
                <Picker.Item label="8" value={8} />
                <Picker.Item label="9" value={9} />
                <Picker.Item label="10" value={10} />
            </ShipDropdown>
            <ShipDropdown selectedValue={direction} onValueChange={(itemValue: any) => {
                setDirection(itemValue);
            }
            }>
                <Picker.Item label="Vertical" value="VERTICAL" />
                <Picker.Item label="Horizontal" value="HORIZONTAL" />
            </ShipDropdown>
        </ShipPosition>
    );
}
export default ShipMapInput;