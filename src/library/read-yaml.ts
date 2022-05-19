import {  exists, readAsync } from 'fs-jetpack'
import { parse } from 'yaml'

export async function readYamlFile<T>(filePath: string): Promise<T> {
    if (!exists) {
        return {} as T;
    }
    const data = await readAsync(filePath, 'utf8');
    if (!data) {
        return {} as T;
    }
    return (parse(data) ?? {})as T;
}
