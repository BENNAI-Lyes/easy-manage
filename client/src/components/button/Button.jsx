import "./button.scss";

export default function Button({ name }) {
  return <button className={"button " + name}> {name} </button>;
}
