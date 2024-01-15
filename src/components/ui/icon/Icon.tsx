// Import React and any necessary dependencies
import { FC } from 'react';

// Import icons from the equivalent icons.js file
import icons, { Icons } from '@/icons'; // Assuming there's an Icons type

// Define props interface for the component
interface IconComponentProps {
  icon: string;
  onClick?: () => void;
}

// Define the React component
const IconComponent: FC<IconComponentProps> = ({ icon, onClick = () => {} }) => {
  // Use type assertion to tell TypeScript that icons has an index signature
  const iconPath = (icons as Icons)[icon];

  return (
    <span
      onClick={onClick}
      className='icon'
      dangerouslySetInnerHTML={{ __html: iconPath }}
    />
  );
};

// Export the React component
export default IconComponent;
