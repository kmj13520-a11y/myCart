import "./Table.css";

// headings: 제목배열, children: 테이블의 본문 내용
export default function Table({ headings, children }) {
  return (
    <table className="common_table">
      <thead>
        <tr>
          {headings.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
  );
}
