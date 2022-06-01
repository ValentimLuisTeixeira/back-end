import { 
    v4 as uuidv4, 
    version as uuidVersion, 
    validate as uuidValidate 
} from 'uuid';


export class UniqueIdentifierV4 {
    /**
     * Generates a random UUIDV4
     */
    createUUIDv4(): string {
        return uuidv4();
    }

    /**
     * Validate uuidv4
     * @param uuid uuid to validate
     */
    uuidValidateV4(uuid: string): boolean {
        return uuidValidate(uuid) && uuidVersion(uuid) === 4;
    }
}