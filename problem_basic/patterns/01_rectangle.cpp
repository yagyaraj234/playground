#include <iostream>
using namespace std;


void PrintReatangePattern(){

    int a=5,b=5;


    for (int i=0;i<a;i++){

        for(int j=0;j<b;j++){
            cout<< " * ";
        }

        cout<< endl;
    }




}


int main(){

    PrintReatangePattern();

    return 0;
}