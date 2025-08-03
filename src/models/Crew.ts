type CrewType = {
    crew_id?: string;
    crew_name: string;
    crew_token: string;
    banner_id?: string;
    banner_name: string;
    banner_type: string;
    banner_url: string;
    banner_hash: string;
};

type CrewCreateResponseType = {
    result: string;
    status: boolean;
    message: string;
};

type CrewNeonResultType = {
    result: CrewType;
    status: boolean;
    message: string;
};

type CrewsNeonResultType = {
    result: CrewType[];
    status: boolean;
    message: string;
};

interface CrewSlug {
    params: {
        slug: string;
    };
}

type CrewEditSlug = {
    params: Promise<{ slug: string; id: string }>;
};

type Slug = {
    slug: string;
};

type EditSlug = {
    slug: string;
    id: string;
};
