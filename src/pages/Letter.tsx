import Button from '../components/buttons/Button.tsx';

const MyLetter: React.FC = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Button text="편지 쓰러 가기" size="large" color="white" />
            <Button text="위시리스트 보러 가기" size="large" color="black" />
        </div>
    );
};

export default MyLetter;
