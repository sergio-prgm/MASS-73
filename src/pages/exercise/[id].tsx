import { GetServerSideProps } from 'next'

export default function ExercisePractice ({ params }: { params: {id: number}}) {
  return <p>
    Session etc
    {params.id}
  </p>
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      params
    }
  }
}
