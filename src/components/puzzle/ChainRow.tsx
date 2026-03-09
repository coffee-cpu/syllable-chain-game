import type { ChainLink } from '../../types/index.ts';

interface ChainRowProps {
  link: ChainLink;
  solved: boolean;
  shaking: boolean;
  onTap: (left: string) => void;
}

export function ChainRow({ link, solved, shaking, onTap }: ChainRowProps) {
  const handleClick = () => {
    if (!solved) {
      onTap(link.left);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={solved}
      className={`
        w-full flex items-center gap-2 px-3 py-3 rounded-xl border-2 transition-all duration-200
        ${solved
          ? 'bg-green-50 border-green-300 opacity-60 cursor-default'
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md cursor-pointer active:scale-[0.98]'
        }
        ${shaking ? 'animate-shake border-red-400 bg-red-50' : ''}
      `}
    >
      {link.emojiLeft && <span className="text-xl shrink-0">{link.emojiLeft}</span>}
      <span className={`text-sm font-medium text-left flex-1 ${solved ? 'text-green-700' : 'text-gray-700'}`}>
        {link.left}
      </span>
      <span className={`
        px-2 py-1 rounded-lg text-sm font-bold min-w-[2.5rem] text-center shrink-0
        ${solved ? 'bg-green-200 text-green-800' : 'bg-amber-100 text-amber-800 border border-amber-300'}
      `}>
        {link.syllable || '\u00A0'}
      </span>
      <span className="text-gray-300 shrink-0">&rarr;</span>
      <span className={`text-sm text-right flex-1 ${solved ? 'text-green-600' : 'text-gray-500'}`}>
        {link.right}
      </span>
      {link.emojiRight && <span className="text-xl shrink-0">{link.emojiRight}</span>}
      {solved && <span className="text-green-500 shrink-0">&check;</span>}
    </button>
  );
}
