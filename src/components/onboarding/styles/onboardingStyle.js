import styled from 'styled-components';

const OnboardingContainer = styled.div`
    height: 100vh;
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    h1 {
        margin-bottom: 4px;
        font-size: 2rem;
        font-weight: 700;
        color: #ffffff;
    }
    
    .instructions {
        margin-bottom: 16px;
        font-size: 1rem;
        font-weight: 500;
        color: #ffffff;
    }

    .tracks {
        .track {
            margin-right: 8px;
            margin-bottom: 8px;
            padding: 10px 24px;
            border: solid 1px #0099ff;
            border-radius: 3px;
            font-family: 'Nunito', sans-serif;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
            transition: 0.25s;
            outline: none;
        }

        .track:nth-child(1) {
            background: ${props => props.tracks[0].value ? '#0099ff' : 'none'};
            color: ${props => props.tracks[0].value ? '#ffffff' : '#0099ff'};

            :hover {
                background-color: #0099ff;
                color: #ffffff;
            }

            :active {
                opacity: 0.5;
            }
        }

        .track:nth-child(2) {
            background: ${props => props.tracks[1].value ? '#0099ff' : 'none'};
            color: ${props => props.tracks[1].value ? '#ffffff' : '#0099ff'};

            :hover {
                background-color: #0099ff;
                color: #ffffff;
            }

            :active {
                opacity: 0.5;
            }
        }

        .track:nth-child(3) {
            background: ${props => props.tracks[2].value ? '#0099ff' : 'none'};
            color: ${props => props.tracks[2].value ? '#ffffff' : '#0099ff'};

            :hover {
                background-color: #0099ff;
                color: #ffffff;
            }

            :active {
                opacity: 0.5;
            }
        }

        .track:nth-child(4) {
            background: ${props => props.tracks[3].value ? '#0099ff' : 'none'};
            color: ${props => props.tracks[3].value ? '#ffffff' : '#0099ff'};

            :hover {
                background-color: #0099ff;
                color: #ffffff;
            }

            :active {
                opacity: 0.5;
            }
        }

        .track:nth-child(5) {
            background: ${props => props.tracks[4].value ? '#0099ff' : 'none'};
            color: ${props => props.tracks[4].value ? '#ffffff' : '#0099ff'};

            :hover {
                background-color: #0099ff;
                color: #ffffff;
            }

            :active {
                opacity: 0.5;
            }
        }

        .track:nth-child(6) {
            background: ${props => props.tracks[5].value ? '#0099ff' : 'none'};
            color: ${props => props.tracks[5].value ? '#ffffff' : '#0099ff'};

            :hover {
                background-color: #0099ff;
                color: #ffffff;
            }

            :active {
                opacity: 0.5;
            }
        }
    }

    .continue {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .error {
            font-size: 0.875rem;
            font-weight: 600;
            color: #ea4335;
        }

        button {
            margin-left: 16px;
            padding: 10px 24px;
            background: linear-gradient(to right, #0084ff, #0099ff);
            border: none;
            border-radius: 3px;
            font-family: 'Nunito', sans-serif;
            font-size: 0.875rem;
            font-weight: 600;
            color: #ffffff;
            cursor: pointer;
            transition: 0.25s;
            
            i {
                margin-left: 4px;
                font-size: 0.75rem;
            }

            :hover {
                opacity: 0.5;
            }
        }
    }

    @media (min-width: 375px) {
        height: 90vh;
    }

    @media (min-width: 768px) {
        width: 691.2px;
    }
`;

export default OnboardingContainer;