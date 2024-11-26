import Button from '../components/buttons/Button.tsx';

const MyLetter: React.FC = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Button text="마이페이지" size="large" color="white" />
            <Button text="편지 링크 복사하기" size="large" color="black" />
        </div>
    );
};

export default MyLetter;
