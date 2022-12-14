import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { H1, P } from "../../components/elements";
import { Block, Grid } from "../../components/wrappers";
import { MainLayout } from "../../layouts/main/main";
import { IBrandDB } from "../../models/brands";

export default function BrandPage({ brand }: { brand: IBrandDB | null }) {
  return (
    <>
      {brand && (
        <MainLayout title={brand.title}>
          <Grid rows="repeat(10, max-content)" cols="repeat(3, 1fr)">
            <Block area="1/1/2/4" padding="0">
              <img src={brand.baner} alt="" height={300} />
            </Block>
            <Block area="2/1/3/4" padding="40px">
              <H1>{brand.title}</H1>
              <P>{brand.description}</P>
              {/* {brand && <BrandAdminPreview brand={brand} />} */}
            </Block>
          </Grid>
        </MainLayout>
      )}
    </>
  );
}
const domain =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_DOMAIN
    : process.env.NEXT_PUBLIC_DOMAIN;

export const getStaticPaths: GetStaticPaths = async () => {
  await axios
    .post<IBrandDB[]>(domain + "/api/brands", {})
    .then((res) => {
      return {
        paths: res.data.map((brand) => `/brands/${brand.alias}`),
        fallback: true,
      };
    })
    .catch((err) => console.log(err.message));
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  await axios
    .post<IBrandDB[]>(domain + "/api/brands", { alias: params.alias })
    .then((res) => {
      return {
        props: {
          brands: res.data[0],
        },
      };
    })
    .catch((err) => console.log(err.message));

  return {
    props: {
      brands: null,
    },
  };
};
