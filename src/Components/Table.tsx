import React from "react";
import styled from "styled-components/native";

type TCell = 'X' | 'O' | '';

interface ITable {
    state: TCell[][];
}

const Cell = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
    margin: 2px;
`;

const Row = styled.View`
    flex-direction: row;
`;

// Add a new styled component for the table container
const TableContainer = styled.View`
    flex-direction: column;
`;

const Table: React.FC<ITable> = ({ state }) => {
    return (
        <TableContainer>
            {state.map((row, i) => (
                <Row key={i}>
                    {row.map((cell, j) => (
                        <Cell key={j}>
                            {cell}
                        </Cell>
                    ))}
                </Row>
            ))}
        </TableContainer>
    );
}

export default Table;
