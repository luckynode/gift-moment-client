interface GetInfoProps {
    onNext: () => void;
}

export default function AccountInput({ onNext } : GetInfoProps){
    return(
        <>
        <div>
            계좌 등록 페이지
        </div>
        <button onClick={onNext}>다음으로</button>
        </>
    )
}