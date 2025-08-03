type FileType = {
    file_id?: string;
    file_name: string;
    file_type: string;
    file_size: number;
    file_url: string;
    file_crew_id: string;
    original_file?: File;
};

type FileNeonResultType = {
    result: FileType;
    status: boolean;
    message: string;
};

type FilesNeonResultType = {
    result: FileType[];
    status: boolean;
    message: string;
};

type FilePinataResultType = {
    result: {
        banner_id: string;
        banner_url: string;
        banner_hash: string;
    };
    status: boolean;
    message: string;
};

type FileCreateResponseType = {
    result: string;
    status: boolean;
    message: string;
};

type PinataInsert = {
    banner_id: string;
    banner_url: string;
    banner_hash: string;
};
