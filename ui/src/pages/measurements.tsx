import { Container } from "@mui/material";

import Layout from "@/layouts/layout";
import UnderConstruction from "@/components/UnderConstruction";

export default function Measurements () {
    return (
        <Layout title="Measurements">
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <UnderConstruction />
            </Container>  
        </Layout>
    )
}