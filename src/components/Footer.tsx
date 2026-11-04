export default function Footer({ sheet = 1 }: { sheet?: number | null }) {
  return (
    <footer className="page-shell footer">
      <table className="title-block">
        <caption className="sr-only">Sheet information</caption>
        <tbody>
          <tr>
            <th scope="row">Title</th>
            <td colSpan={3}>Jai Dilbaghi</td>
          </tr>
          <tr>
            <th scope="row">Location</th>
            <td colSpan={3}>Austin, TX</td>
          </tr>
          <tr>
            <th scope="row">Rev</th>
            <td>2026-11</td>
            <th scope="row">Sheet</th>
            <td>{sheet ? `${sheet} of 4` : "Unconnected"}</td>
          </tr>
        </tbody>
      </table>
    </footer>
  );
}
