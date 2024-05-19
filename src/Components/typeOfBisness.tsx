// Import Link from Next.js
import Link from 'next/link';

interface TypeOfBusinessProps {
  name1: string;
  name2: string;
  name3?: string;
}

const TypeOfBusiness: React.FC<TypeOfBusinessProps> = ({ name1, name2, name3}) => {
  return (
    <>
      <Link
        href={` ${name3 ? `/authorize/tax` : `/authorize/register`}`}
        className='underline'
        passHref
      >
        {name1}
      </Link>
      <span className='text-[#CCCCCC] text-[60px] mt-3 mx-5'>|</span>
      {name3 ? (
        <Link
          href="/authorize/register"
          passHref
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className='underline'>{name2}</span>
            <span className='text-[23px] mt-[-20px] no-underline'>{name3}</span>
          </div>
        </Link>
      ) : (
        <Link
          href="/authorize/tax"
          className='underline'
          passHref
        >
          {name2}
        </Link>
      )}
    </>
  );
};

export default TypeOfBusiness;
