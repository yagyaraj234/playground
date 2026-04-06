// Problem 07: Find All Permutations
// Description: Print all permutations of a given string.

#include <iostream>
#include <string>
#include <utility>
#include <vector>

using namespace std;



void recurPermutate(int idx, string &s, vector<string> &res){

    if(idx == s.size()){

        res.push_back(s);
        return;

    }

    for(int i=idx;i<s.size();i++){
        swap(s[i],s[idx]);
        recurPermutate(idx+1, s,res);
        swap(s[i],s[idx]);
    }


}

void PrintPermutations(std::string str){

    std::vector<std::string> v;
    int len =str.length()-1;

    recurPermutate(0,str,v);


    for (auto it = v.begin(); it != v.end(); it++) {
        std::cout << *it << " "; // Dereference to access value
    }

}

int main() {

    std::string str ="ABC";

    PrintPermutations(str);

    return 0;
}
