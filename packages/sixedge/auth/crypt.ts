import bcrypt from "bcrypt";

export async function validate(password: string, hash: string) {
    const validation = await bcrypt.compare(password, hash);
    if (!Boolean(validation)) throw "Unauthorized password and hash doesn't match"
    return true
}

export async function crypt(password: string, saltRounds: number = 10): Promise<string> {
    if(!password) throw `Can not crypt: ${password}`
    const hash = await bcrypt.hash(password, saltRounds);
    return hash
}