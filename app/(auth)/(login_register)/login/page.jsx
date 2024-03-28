import LoginForm from "@/components/LoginForm/LoginForm"
import { translate } from "@/lib/funcs/translate";
import { cookies } from "next/headers";

export function generateMetadata() {
    const language = cookies().get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language)
    const { loginAccount, loginPageDescription } = translates;
    return {
        title: loginAccount,
        description: loginPageDescription,
    }
}

export default async function page() {
    const cookie = cookies();
    const language = cookie.get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language);
    
    return (
        <div className="container">
            <h1 className="text-center my-2 text-3xl font-bold text-white">{translates.loginAccount}</h1>
            <LoginForm lang={language} />
        </div>
    )
}
