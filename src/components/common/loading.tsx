import { PulseLoader } from "react-spinners"
import styled from "styled-components"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
`

export default function Loading() {
    return (
        <Wrapper>
            <PulseLoader
                color="#c8c8c8"
                size={10}
                speedMultiplier={1}
            />
        </Wrapper>
    )
}