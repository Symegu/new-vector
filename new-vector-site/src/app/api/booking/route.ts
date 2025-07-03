// app/api/booking/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Booking from '@/models/Booking';

// Подключение к MongoDB
// const connectDB = async () => {
//   if (mongoose.connection.readyState >= 1) return;
  
//   const MONGODB_URI = process.env.MONGODB_URI;
//   if (!MONGODB_URI) {
//     throw new Error('MONGODB_URI is not defined');
//   }
  
//   await mongoose.connect(MONGODB_URI);
// };

// export async function POST(req: Request) {
//   try {
//     await connectDB();
    
//     const data = await req.json();
    
//     // Валидация для юридических услуг
//     if (!data.name || !data.phone) {
//       return NextResponse.json(
//         { success: false, error: "Укажите имя и телефон" },
//         { status: 400 }
//       );
//     }
    
//     // Проверка типа услуги
//     const validServiceTypes = ['consultation', 'full', 'documents'];
//     if (!validServiceTypes.includes(data.serviceType)) {
//       return NextResponse.json(
//         { success: false, error: "Неверный тип услуги" },
//         { status: 400 }
//       );
//     }
    
//     const booking = new Booking(data);
//     await booking.save();
    
//     // Здесь можно добавить отправку уведомления в Telegram/Email
    
//     return NextResponse.json({ 
//       success: true,
//       message: "Заявка принята! Юрист свяжется с вами в течение 15 минут" 
//     });
    
//   } catch (error) {
//     console.error('Booking error:', error);
//     return NextResponse.json(
//       { success: false, error: "Ошибка сервера" },
//       { status: 500 }
//     );
//   }
// }