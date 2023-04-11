import trashcan from '../../public/images/trashcan.svg';
import editsquare from '../../public/images/editsquare.svg';

type BaseCardProps = {
  type: 'basic' | 'postcard';
  children?: React.ReactNode;
  content: string;
  title?: string;
  canInteract?: boolean;
  user?: string;
  timeMoment?: string;
  size?: 'small' | 'medium';
  onDelete?: () => void;
  onEdit?: () => void;
};

const sizes = {
  small: 'w-[90%] card:w-[500px] h-[205px]',
  medium: 'w-[90%] card:w-[752px] h-[316px]',
};

function BaseCard({
  children,
  type,
  canInteract,
  title,
  user,
  timeMoment,
  size = 'medium',
  content = ' ',
  onDelete,
  onEdit,
}: BaseCardProps) {
  if (type === 'basic') {
    return <div className={`bg-ghost rounded-[16px] ${sizes[size]} border border-sand shadow-xl`}>{children}</div>;
  }

  return (
    <div className="bg-ghost rounded-[16px] w-[90%] card:w-[752px] h-[316px] border-1 border-sand shadow-xl animate-zoomIn">
      <div className="w-full bg-primary h-[70px] flex items-center justify-between text-white rounded-t-[16px] border-1 border-transparent px-6">
        <span className="text-[22px] font-bold">{title}</span>
        {canInteract && (
          <div className="flex space-x-5 items-center justify-center">
            <button className="hover:opacity-70 transition ease-in-out" onClick={onDelete}>
              <img src={trashcan} alt="trashcan" />
            </button>
            <button className="hover:opacity-70 transition ease-in-out" onClick={onEdit}>
              <img src={editsquare} alt="editsquare" />
            </button>
          </div>
        )}
      </div>
      <div className="w-full h-full px-6 mt-5 text-[18px]">
        <div className="flex justify-between items-center text-deeperSand">
          <span className="font-bold">{user}</span>
          <span className="font-thin">{timeMoment}</span>
        </div>
        <div
          className={`h-[155px] mt-4 overflow-scroll overflow-x-hidden ${
            content?.length < 365 ? 'overflow-y-hidden' : ''
          }`}
        >
          <span>{content}</span>
        </div>
      </div>
    </div>
  );
}

export default BaseCard;
