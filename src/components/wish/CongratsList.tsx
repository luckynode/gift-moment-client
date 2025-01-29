import styled from "styled-components";
import {ornamentImages} from "../../assets/ornamentImages";

interface Payment {
    name: string;
    amount: string;
}

interface CongratsListProps {
    payments: Payment[];
}

const Congrats = styled.div`
  margin-top: 40px;
`;

const CongratsTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Card = styled.div`
  width: 150px;
  text-align: center;
`;

const CardImg = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const CardName = styled.div`
  font-size: 14px;
`;

const FriendName = styled.p`
  font-weight: bold;
`;

const FriendPercent = styled.p`
  color: #666;
`;

function CongratsList({payments}: CongratsListProps) {
    return (
        <Congrats>
            <CongratsTitle>축하해준 친구들</CongratsTitle>
            <List>
                {payments.map((payment, index) => (
                    <Card key={payment.name}>
                        <CardImg src={ornamentImages[index % ornamentImages.length]}/>
                        <CardName>
                            <FriendName>{payment.name}</FriendName>
                            <FriendPercent>
                                {payment.amount ? Number(payment.amount).toLocaleString() : "0"}
                                원
                            </FriendPercent>
                        </CardName>
                    </Card>
                ))}
            </List>
        </Congrats>
    );
}

export default CongratsList;
