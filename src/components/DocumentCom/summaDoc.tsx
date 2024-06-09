import React from 'react'

interface SummaPropsDoc {
    summa: {
        sumHave: string;
        allLimit: string;
    };
}

const SummaDoc: React.FC<SummaPropsDoc> = ({ summa }) => {
    return (
        <div className='flex flex-col items-baseline'>
            <span className='text-linkSm text-end' >{summa.sumHave} /</span>
            <span className='ml-2 text-end'>{summa.allLimit}</span>
        </div>
    )
}

export default SummaDoc