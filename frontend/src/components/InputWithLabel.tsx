// import React, { ReactNode, InputHTMLAttributes } from 'react';
// import Input from './Input';
// import Typography from './Typography';

// interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   children?: ReactNode;
//   error?: boolean;
// }

// const InputWithLabel: React.FC<InputWithLabelProps> = ({
//   label,
//   children,
//   error = false,
//   ...rest
// }) => {
//   const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
//     const { min, value } = event.target;
//     if (min && value === '') return;
//     if (min && parseFloat(value) < parseFloat(min)) {
//       event.target.value = min;
//     }
//   };

//   return (
//     <div className="mb-4">
//       <label>
//         <Typography
//           variant="small"
//           className="mb-2 block text-left font-medium text-gray-900"
//         >
//           {label}
//         </Typography>
//       </label>
//       <div className="flex flex-row w-full gap-x-4">
//         <Input
//           className={`!border focus:ring-0 ${
//             error
//               ? '!border-red-600'
//               : 'focus:!border-gray-900 !border-blue-gray-200'
//           }`}
//           labelProps={{
//             className: 'hidden',
//           }}
//           onBlur={onBlur}
//           {...rest}
//         />
//         {children}
//       </div>
//     </div>
//   );
// };

// export default InputWithLabel;
