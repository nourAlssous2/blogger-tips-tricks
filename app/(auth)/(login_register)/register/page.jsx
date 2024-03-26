import RegisterForm from '@/components/RegisterForm/RegisterForm';
import { translate } from '@/lib/funcs/translate';
import { cookies } from 'next/headers';

export function generateMetadata() {
    const language = cookies().get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language);
    const { createAccount } = translates;
    return {
        title: createAccount,
        description: createAccount,
    }
}

export default async function page() {
    const cookie = cookies();
    const language = cookie.get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language);
    
    return (
        <div className="container">
            <h1 className="text-center my-2 text-3xl font-bold">{translates.createAccount}</h1>
            <RegisterForm lang={language} />
        </div>
    )
}
